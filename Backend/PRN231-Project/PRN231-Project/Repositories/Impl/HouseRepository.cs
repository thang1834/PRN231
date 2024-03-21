using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace PRN231_Project.Repositories
{
    public class HouseRepository : IHouseRepository
    {
        private readonly HouseRentalContext _context;

        public HouseRepository(HouseRentalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<House>> GetAllHousesAsync()
        {
            return await _context.Houses.ToListAsync();
        }

        public async Task<House> GetHouseByIdAsync(int houseId)
        {
            return await _context.Houses.FindAsync(houseId);
        }

        // Implement other methods based on your application's requirements
        // Example implementation:
        // public async Task<IEnumerable<House>> GetHousesByOwnerIdAsync(int ownerId)
        // {
        //     return await _context.Houses.Where(h => h.OwnerId == ownerId).ToListAsync();
        // }

        public async Task<House> AddHouseAsync(House house)
        {
            _context.Houses.Add(house);
            await _context.SaveChangesAsync();
            return house;
        }

        public async Task<House> UpdateHouseAsync(House house)
        {
            _context.Entry(house).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return house;
        }

        public async Task<bool> RemoveHouseAsync(int houseId)
        {
            var house = await _context.Houses.FindAsync(houseId);
            if (house != null)
            {
                _context.Houses.Remove(house);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

		public async Task<List<House>> GetHouseByUserIdAsync(int userId)
		{
			return await _context.Houses.Where(x => x.UserId == userId).ToListAsync();
		}

        public async Task<House> GetHouseByIdAsyncWithServices(int houseId)
        {
            return await _context.Houses.Include(x=> x.Services).FirstOrDefaultAsync(x=> x.Id == houseId);
        }
    }
}
