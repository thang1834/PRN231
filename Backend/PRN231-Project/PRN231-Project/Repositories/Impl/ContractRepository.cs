using PRN231_Project.Models;

namespace PRN231_Project.Repositories.Impl
{
    public class ContractRepository : IContractRepository
    {
        public Task AddContractAsync(Contract contract)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Contract>> GetAllContractsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Contract> GetContractByIdAsync(int contractId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Contract>> GetContractsByHouseIdAsync(int houseId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Contract>> GetContractsByUserIdAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Contract>> GetContractsInDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            throw new NotImplementedException();
        }

        public Task RemoveContractAsync(int contractId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateContractAsync(Contract contract)
        {
            throw new NotImplementedException();
        }
    }
}
