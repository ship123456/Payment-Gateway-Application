import { useState } from "react";
import "./FAQ.css";
const faqs = [
  {
    question: "How do I create a payment?",
    answer:
      "Go to New Payment, enter customer details, amount and payment method, then click Create Payment.",
  },
  {
    question: "Which payment methods are supported?",
    answer: "UPI, Cards, Wallets and Net Banking are supported.",
  },
  {
    question: "How do I export payment history?",
    answer: "Open Payment History and click the Export CSV button.",
  },
  {
    question: "How do I change my password?",
    answer: "Navigate to Change Password → Fill in details.",
  },
  {
    question: "How do I contact support?",
    answer: "Open Contact Support, submit a ticket and our team will respond.",
  },
];
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <p className="page-subtitle">
        Find answers to common questions about PayFlow.
      </p>
      <div className="faq-card">
        {faqs.map((item, index) => (
          <div className="faq-item" key={index}>
            <button
              className="faq-question"
              onClick={() => setOpen(open === index ? null : index)}
            >
              <span>{item.question}</span>
              <span>{open === index ? "−" : "+"}</span>
            </button>
            {open === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
export default FAQ;
