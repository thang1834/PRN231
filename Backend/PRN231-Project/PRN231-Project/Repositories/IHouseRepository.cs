using PRN231_Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRN231_Project.Repositories
{
    public interface IHouseRepository
    {
        Task<IEnumerable<House>> GetAllHousesAsync();
        Task<House> GetHouseByIdAsync(int houseId);
        // Add other methods as required by your application, for example:
        // Task<IEnumerable<House>> GetHousesByOwnerIdAsync(int ownerId);
        Task<House> AddHouseAsync(House house);
        Task<House> UpdateHouseAsync(House house);
        Task<bool> RemoveHouseAsync(int houseId);
        Task<List<House>> GetHouseByUserIdAsync(int userId);

        Task<House> GetHouseByIdAsyncWithServices(int houseId);

	}
}
