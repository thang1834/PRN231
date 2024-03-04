using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PRN231_Project.Repositories
{
    public class ContractRepository : IContractRepository
    {
        private readonly HouseRentalContext _context;

        public ContractRepository(HouseRentalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contract>> GetAllContractsAsync()
        {
            return await _context.Contracts.ToListAsync();
        }

        public async Task<Contract> GetContractByIdAsync(int contractId)
        {
            return await _context.Contracts.FindAsync(contractId);
        }

        public async Task<IEnumerable<Contract>> GetContractsByUserIdAsync(int userId)
        {
            return await _context.Contracts.Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task<IEnumerable<Contract>> GetContractsByHouseIdAsync(int houseId)
        {
            return await _context.Contracts.Where(c => c.HouseId == houseId).ToListAsync();
        }

        public async Task<IEnumerable<Contract>> GetContractsInDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Contracts
                .Where(c => c.StartDate >= startDate && c.EndDate <= endDate)
                .ToListAsync();
        }

        public async Task<Contract> AddContractAsync(Contract contract)
        {
            _context.Contracts.Add(contract);
            await _context.SaveChangesAsync();
            return contract;
        }

        public async Task<Contract> UpdateContractAsync(Contract contract)
        {
            _context.Entry(contract).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return contract;
        }

        public async Task<Contract> RemoveContractAsync(int contractId)
        {
            var contract = await _context.Contracts.FindAsync(contractId);
            if (contract != null)
            {
                _context.Contracts.Remove(contract);
                await _context.SaveChangesAsync();
                return contract;
            }
            return null;
        }

        // Các hàm khác theo yêu cầu cụ thể của ứng dụng của bạn
    }
}
