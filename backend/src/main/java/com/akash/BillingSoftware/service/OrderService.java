package com.akash.BillingSoftware.service;

import com.akash.BillingSoftware.io.OrderRequest;
import com.akash.BillingSoftware.io.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    List<OrderResponse> fetchOrders();
}
