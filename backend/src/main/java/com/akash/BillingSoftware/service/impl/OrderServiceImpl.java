package com.akash.BillingSoftware.service.impl;

import com.akash.BillingSoftware.entity.ItemEntity;
import com.akash.BillingSoftware.entity.OrderEntity;
import com.akash.BillingSoftware.entity.OrderItemEntity;
import com.akash.BillingSoftware.io.OrderItemRequest;
import com.akash.BillingSoftware.io.OrderItemResponse;
import com.akash.BillingSoftware.io.OrderRequest;
import com.akash.BillingSoftware.io.OrderResponse;
import com.akash.BillingSoftware.repo.ItemRepository;
import com.akash.BillingSoftware.repo.OrderRepository;
import com.akash.BillingSoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ItemRepository itemRepository;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        OrderEntity orderEntity = OrderEntity.builder()
                .orderId(UUID.randomUUID().toString())
                .customerName(request.getCustomerName())
                .customerPhone(request.getCustomerPhone())
                .discount(request.getDiscount() != null ? request.getDiscount() : BigDecimal.ZERO)
                .build();

        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItemEntity> orderItems = new ArrayList<>();

        if (request.getItems() != null) {
            for (OrderItemRequest itemReq : request.getItems()) {
                ItemEntity itemEntity = itemRepository.findByItemId(itemReq.getItemId())
                        .orElseThrow(() -> new RuntimeException("Item not found: " + itemReq.getItemId()));

                BigDecimal itemPrice = itemEntity.getPrice();
                BigDecimal itemTotal = itemPrice.multiply(BigDecimal.valueOf(itemReq.getQuantity()));
                subtotal = subtotal.add(itemTotal);

                OrderItemEntity orderItemEntity = OrderItemEntity.builder()
                        .orderEntity(orderEntity)
                        .itemEntity(itemEntity)
                        .quantity(itemReq.getQuantity())
                        .price(itemPrice)
                        .build();

                orderItems.add(orderItemEntity);
            }
        }

        orderEntity.setOrderItems(orderItems);
        orderEntity.setSubtotal(subtotal);

        // 18% Tax Calculation (standard for real-world billing)
        BigDecimal tax = subtotal.multiply(BigDecimal.valueOf(0.18)).setScale(2, RoundingMode.HALF_UP);
        orderEntity.setTax(tax);

        // Total = Subtotal + Tax - Discount
        BigDecimal discount = orderEntity.getDiscount();
        BigDecimal total = subtotal.add(tax).subtract(discount);
        if (total.compareTo(BigDecimal.ZERO) < 0) {
            total = BigDecimal.ZERO;
        }
        orderEntity.setTotal(total.setScale(2, RoundingMode.HALF_UP));

        OrderEntity savedOrder = orderRepository.save(orderEntity);
        return mapToResponse(savedOrder);
    }

    @Override
    public List<OrderResponse> fetchOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private OrderResponse mapToResponse(OrderEntity entity) {
        List<OrderItemResponse> itemResponses = entity.getOrderItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .itemId(item.getItemEntity() != null ? item.getItemEntity().getItemId() : null)
                        .name(item.getItemEntity() != null ? item.getItemEntity().getName() : "Unknown Item")
                        .price(item.getPrice())
                        .quantity(item.getQuantity())
                        .build()
                ).collect(Collectors.toList());

        return OrderResponse.builder()
                .orderId(entity.getOrderId())
                .customerName(entity.getCustomerName())
                .customerPhone(entity.getCustomerPhone())
                .subtotal(entity.getSubtotal())
                .tax(entity.getTax())
                .discount(entity.getDiscount())
                .total(entity.getTotal())
                .createdAt(entity.getCreatedAt())
                .items(itemResponses)
                .build();
    }
}
