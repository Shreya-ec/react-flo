
import moment from "moment-timezone";

export default [
    {
        "invoiceNumber": 300500,
        "status": "debit",
        "subscription": "Platinum Subscription Plan",
        "price": "799,00",
        "issueDate": moment().subtract(1, "days").format("DD MMM YYYY"),
        "dueDate": moment().subtract(1, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300499,
        "status": "debit",
        "subscription": "Platinum Subscription Plan",
        "price": "799,00",
        "issueDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "dueDate": moment().subtract(2, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300498,
        "status": "debit",
        "subscription": "Platinum Subscription Plan",
        "price": "799,00",
        "issueDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "dueDate": moment().subtract(2, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300497,
        "status": "debit",
        "subscription": "Flexible Subscription Plan",
        "price": "233,42",
        "issueDate": moment().subtract(3, "days").format("DD MMM YYYY"),
        "dueDate": moment().subtract(3, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300496,
        "status": "credit",
        "subscription": "Gold Subscription Plan",
        "price": "533,42",
        "issueDate": moment().subtract(1, "day").subtract(1, "month").format("DD MMM YYYY"),
        "dueDate": moment().subtract(1, "day").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300495,
        "status": "credit",
        "subscription": "Gold Subscription Plan",
        "price": "533,42",
        "issueDate": moment().subtract(3, "days").subtract(1, "month").format("DD MMM YYYY"),
        "dueDate": moment().subtract(3, "days").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300494,
        "status": "credit",
        "subscription": "Flexible Subscription Plan",
        "price": "233,42",
        "issueDate": moment().subtract(4, "days").subtract(1, "month").format("DD MMM YYYY"),
        "dueDate": moment().subtract(4, "days").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300493,
        "status": "credit",
        "subscription": "Gold Subscription Plan",
        "price": "533,42",
        "issueDate": moment().subtract(20, "days").subtract(1, "month").format("DD MMM YYYY"),
        "dueDate": moment().subtract(20, "days").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300492,
        "status": "credit",
        "subscription": "Platinum Subscription Plan",
        "price": "799,00",
        "issueDate": moment().subtract(2, "months").format("DD MMM YYYY"),
        "dueDate": moment().subtract(3, "months").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300491,
        "status": "debit",
        "subscription": "Platinum Subscription Plan",
        "price": "799,00",
        "issueDate": moment().subtract(6, "days").format("DD MMM YYYY"),
        "dueDate": moment().subtract(6, "days").add(1, "month").format("DD MMM YYYY")
    }
    
]