using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;

namespace PRN231_Project.Repositories.Impl
{
    public class HouseServiceRepository : IHouseServiceRepository
    {
        private readonly HouseRentalContext _context;

        public HouseServiceRepository(HouseRentalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Service>> GetAllServicesAsync()
        {
            return await _context.Services.ToListAsync();
        }

        public async Task<Service> GetServiceByIdAsync(int serviceId)
        {
            return await _context.Services.FindAsync(serviceId);
        }

        public async Task<Service> AddServiceAsync(Service service)
        {
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return service;
        }

        public async Task<Service> UpdateServiceAsync(Service service)
        {

            _context.Entry(service).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await ServiceExists(service.Id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return service;
        }

        public async Task<bool> RemoveServiceAsync(int serviceId)
        {
            var service = await _context.Services.FindAsync(serviceId);
            if (service == null)
            {
                return false;
            }

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Service>> GetServicesByHouseIdAsync(int houseId)
        {
            return await _context.Houses
                .Where(h => h.Id == houseId)
                .SelectMany(h => h.Services)
                .ToListAsync();
        }

        private async Task<bool> ServiceExists(int serviceId)
        {
            return await _context.Services.AnyAsync(s => s.Id == serviceId);
        }
    }
}
