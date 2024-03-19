using PRN231_Project.Models;

namespace PRN231_Project.Repositories
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<Payment>> GetAllPaymentsAsync();
        Task<IEnumerable<Payment>> GetPaymentsByUserIdAsync(int userId);
        Task<Payment> GetPaymentByIdAsync(int PaymentId);

        Task<Payment> AddPaymentAsync(Payment Payment);
        Task<Payment> UpdatePaymentAsync(Payment Payment);
        Task<bool> RemovePaymentAsync(int PaymentId);
    }
}
