package com.akash.BillingSoftware.controller;

import com.akash.BillingSoftware.io.OrderResponse;
import com.akash.BillingSoftware.io.PaymentRequest;
import com.akash.BillingSoftware.io.PaymentVerificationRequest;
import com.akash.BillingSoftware.io.RazorPayOrderResponse;
import com.akash.BillingSoftware.service.OrderService;
import com.akash.BillingSoftware.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorPayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest paymentRequest)throws RazorpayException{
        return razorpayService.createOrder(paymentRequest.getAmount(),paymentRequest.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest paymentVerificationRequest){
        return orderService.verifyPayment(paymentVerificationRequest);
    }

}
