using PRN231_Project.Models;

namespace PRN231_Project.Repositories
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<Payment>> GetAllPaymentsAsync();
        Task<Payment> GetPaymentByIdAsync(int PaymentId);
        Task<IEnumerable<Payment>> GetPaymentsByUserIdAsync(int userId);
        Task<Payment> AddPaymentAsync(Payment Payment);
        Task<Payment> UpdatePaymentAsync(Payment Payment);
        Task<Payment> RemovePaymentAsync(int PaymentId);

    }
}
