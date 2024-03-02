using PRN231_Project.Models;

namespace PRN231_Project.Repositories
{
    public interface IContractRepository
    {
        Task<IEnumerable<Contract>> GetAllContractsAsync();
        Task<Contract> GetContractByIdAsync(int contractId);
        Task<IEnumerable<Contract>> GetContractsByUserIdAsync(int userId);
        Task<IEnumerable<Contract>> GetContractsByHouseIdAsync(int houseId);
        Task<IEnumerable<Contract>> GetContractsInDateRangeAsync(DateTime startDate, DateTime endDate);

        Task AddContractAsync(Contract contract);
        Task UpdateContractAsync(Contract contract);
        Task RemoveContractAsync(int contractId);
    }
}
