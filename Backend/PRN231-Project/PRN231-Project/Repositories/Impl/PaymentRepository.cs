using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PRN231_Project.Repositories.Impl
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly HouseRentalContext _context;

        public PaymentRepository(HouseRentalContext context)
        {
            _context = context;
        }

        public async Task<Payment> AddPaymentAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }

        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
        {
            return await _context.Payments.ToListAsync();
        }

        public async Task<Payment> GetPaymentByIdAsync(int paymentId)
        {
            return await _context.Payments.FindAsync(paymentId);
        }

        public async Task<IEnumerable<Payment>> GetPaymentsByUserIdAsync(int userId)
        {
            return await _context.Payments.Where(x=> x.UserId == userId).ToListAsync();
        }

        public async Task<bool> RemovePaymentAsync(int paymentId)
        {
            var payment = await _context.Payments.FindAsync(paymentId);
            if (payment != null)
            {
                _context.Payments.Remove(payment);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Payment> UpdatePaymentAsync(Payment payment)
        {
            _context.Entry(payment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return payment;
        }
    }
}
