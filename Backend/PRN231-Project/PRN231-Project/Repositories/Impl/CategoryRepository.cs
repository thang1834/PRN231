using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PRN231_Project.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly HouseRentalContext _context;

        public CategoryRepository(HouseRentalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int categoryId)
        {
            return await _context.Categories.FindAsync(categoryId);
        }

  
    }
}
