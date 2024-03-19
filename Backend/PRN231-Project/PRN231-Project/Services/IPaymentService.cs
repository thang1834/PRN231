using PRN231_Project.Dto.Payment;
using PRN231_Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRN231_Project.Services
{
    public interface IPaymentService
    {
        Task<PaymentDto> AddPaymentAsync(PaymentCreateDto payment);
        Task<IEnumerable<PaymentDto>> GetAllPaymentsAsync();
        Task<IEnumerable<PaymentDto>> GetPaymentsByUserIdAsync(int userId);
        Task<PaymentDto> GetPaymentByIdAsync(int paymentId);
        Task<PaymentDto> UpdatePaymentAsync(int paymentId, PaymentUpdateDto payment);
        Task<bool> RemovePaymentAsync(int paymentId);
    }
}
