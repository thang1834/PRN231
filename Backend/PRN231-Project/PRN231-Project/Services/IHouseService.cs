using PRN231_Project.Dto.House;
using PRN231_Project.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRN231_Project.Services
{
    public interface IHouseService
    {
        Task<IEnumerable<HouseDto>> GetAllHousesAsync();
        Task<HouseDto> GetHouseByIdAsync(int houseId);
        Task<House> CreateHouseAsync(HouseCreateDto houseDto);
        Task<bool> UpdateHouseAsync(int houseId, HouseUpdateDto houseDto);
        Task<bool> RemoveHouseAsync(int houseId);
    }
}
