using PRN231_Project.Models;

namespace PRN231_Project.Repositories
{
    public interface IContractRepository
    {
        Task<IEnumerable<Contract>> GetAllContractsAsync();
        Task<Contract> GetContractByIdAsync(int contractId);
        Task<IEnumerable<Contract>> GetContractsByUserIdAsync(int userId);
        Task<IEnumerable<Contract>> GetContractsByHouseIdAsync(int houseId);
        /*Task<IEnumerable<Contract>> GetContractsInDateRangeAsync(DateTime startDate, DateTime endDate);*/

        Task <Contract> AddContractAsync(Contract contract);
        Task <Contract> UpdateContractAsync(Contract contract);
        Task <Contract> RemoveContractAsync(int contractId);
    }
}
