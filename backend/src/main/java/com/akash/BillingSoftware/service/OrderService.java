package com.akash.BillingSoftware.service;

import com.akash.BillingSoftware.io.OrderRequest;
import com.akash.BillingSoftware.io.OrderResponse;
import com.akash.BillingSoftware.io.PaymentVerificationRequest;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    void deleteOrder(String orderId);
    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerificationRequest paymentVerificationRequest);
}
