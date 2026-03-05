package com.akash.BillingSoftware.service;

import com.akash.BillingSoftware.io.RazorPayOrderResponse;
import com.razorpay.RazorpayException;

public interface RazorpayService {
    RazorPayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;

}
