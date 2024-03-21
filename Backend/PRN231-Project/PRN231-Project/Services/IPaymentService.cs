using PRN231_Project.Models;
using PRN231_Project.Dto;
using PRN231_Project.Dto.Payment;

namespace PRN231_Project.Services
{
    public interface IPaymentService
    {
        Task<IEnumerable<PaymentDto>> GetAllPaymentsAsync();
        Task<PaymentDto> GetPaymentByIdAsync(int PaymentId);
        Task<IEnumerable<PaymentDto>> GetPaymentsByUserIdAsync(int userId);

        Task<Payment> CreatePaymentAsync(PaymentCreateDto PaymentDto);
        Task<Payment> UpdatePaymentAsync(int PaymentId, PaymentUpdateDto PaymentDto);
        Task<Payment> RemovePaymentAsync(int PaymentId);
    }
}