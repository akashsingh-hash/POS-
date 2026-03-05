package com.akash.BillingSoftware.io;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Embeddable
@Data
@NoArgsConstructor
@Builder
public class PaymentDetails {
    private String razorpayOrderId;
    private String razorPaymentId;
    private String razorpaySignature;
    private PaymentStatus status;
    public enum PaymentStatus {
        PENDING,COMPLETED,FAILED
    }
}
