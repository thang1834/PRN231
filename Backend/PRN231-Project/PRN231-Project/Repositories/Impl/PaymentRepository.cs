using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PRN231_Project.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly HouseRentalContext _context;

        public PaymentRepository(HouseRentalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
        {
            return await _context.Payments.ToListAsync();
        }

        public async Task<Payment> GetPaymentByIdAsync(int PaymentId)
        {
            return await _context.Payments.FindAsync(PaymentId);
        }

        public async Task<IEnumerable<Payment>> GetPaymentsByUserIdAsync(int userId)
        {
            return await _context.Payments.Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task<Payment> AddPaymentAsync(Payment Payment)
        {
            _context.Payments.Add(Payment);
            await _context.SaveChangesAsync();
            return Payment;
        }

        public async Task<Payment> UpdatePaymentAsync(Payment Payment)
        {
            _context.Entry(Payment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Payment;
        }

        public async Task<Payment> RemovePaymentAsync(int PaymentId)
        {
            var Payment = await _context.Payments.FindAsync(PaymentId);
            if (Payment != null)
            {
                _context.Payments.Remove(Payment);
                await _context.SaveChangesAsync();
                return Payment;
            }
            return null;
        }

        // Các hàm khác theo yêu cầu cụ thể của ứng dụng của bạn
    }
}
