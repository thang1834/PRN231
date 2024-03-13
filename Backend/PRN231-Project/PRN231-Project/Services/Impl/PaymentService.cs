using AutoMapper;
using Microsoft.Extensions.Hosting;
using PRN231_Project.Dto.Payment;
using PRN231_Project.Models;
using PRN231_Project.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRN231_Project.Services.Impl
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _repository;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _environment;
        public PaymentService(IPaymentRepository repository, IMapper mapper, IWebHostEnvironment environment)
        {
            _repository = repository;
            _mapper = mapper;
            _environment = environment;
        }

        public async Task<IEnumerable<PaymentDto>> GetAllPaymentsAsync()
        {
            var Payments = await _repository.GetAllPaymentsAsync();
            return _mapper.Map<IEnumerable<PaymentDto>>(Payments);
        }

        public async Task<PaymentDto> GetPaymentByIdAsync(int PaymentId)
        {
            var Payment = await _repository.GetPaymentByIdAsync(PaymentId);
            return _mapper.Map<PaymentDto>(Payment);
        }

        public async Task<IEnumerable<PaymentDto>> GetPaymentsByUserIdAsync(int userId)
        {
            var Payments = await _repository.GetPaymentsByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<PaymentDto>>(Payments);
        }
        public async Task<Payment> CreatePaymentAsync(PaymentCreateDto PaymentDto)
        {
            string fileImage = "";
            try
            {
                string fileName = $"{DateTime.Now.Ticks}_{PaymentDto.ImageUpload.FileName}";
                fileImage = fileName;
                string filePath = Path.Combine(_environment.WebRootPath, "uploads", "images", fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await PaymentDto.ImageUpload.CopyToAsync(fileStream);
                }
                var Payment = _mapper.Map<Payment>(PaymentDto);
                Payment.FilePath = Path.Combine("uploads", "images", fileName);
                return await _repository.AddPaymentAsync(Payment);
            }
            catch (Exception ex)
            {
                if (!string.IsNullOrEmpty(fileImage))
                {
                    string filePath = Path.Combine(_environment.WebRootPath, "uploads", "images", fileImage);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }
                throw new Exception(ex.Message);
            }
        }

        public async Task<Payment> UpdatePaymentAsync(int PaymentId, PaymentUpdateDto PaymentDto)
        {
            var existingPayment = await _repository.GetPaymentByIdAsync(PaymentId);
            if (existingPayment == null)
            {
                throw new Exception("Payment not found");
            }
            string fileImage = "";
            try
            {
                _mapper.Map(PaymentDto, existingPayment);
                if (PaymentDto.ImageUpload != null)
                {
                    string fileName = $"{DateTime.Now.Ticks}_{PaymentDto.ImageUpload.FileName}";
                    fileImage = fileName;
                    string filePath = Path.Combine(_environment.WebRootPath, "uploads", "images", fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await PaymentDto.ImageUpload.CopyToAsync(fileStream);
                    }

                    var fileExist = Path.Combine(_environment.WebRootPath, existingPayment.FilePath);
                    if (System.IO.File.Exists(fileExist))
                    {
                        System.IO.File.Delete(fileExist);
                    }
                    existingPayment.FilePath = Path.Combine("uploads", "images", fileImage);
                }

                return await _repository.UpdatePaymentAsync(existingPayment);
            }
            catch (Exception ex)
            {
                if (!string.IsNullOrEmpty(fileImage))
                {
                    string filePath = Path.Combine(_environment.WebRootPath, "uploads", "images", fileImage);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }
                throw new Exception(ex.Message);
            }

        }

        public async Task<Payment> RemovePaymentAsync(int PaymentId)
        {
            try
            {
                var deletedPayment = await _repository.RemovePaymentAsync(PaymentId);
                string filePath = Path.Combine(_environment.WebRootPath, deletedPayment.FilePath);
                if (System.IO.File.Exists(filePath))
                {

                    System.IO.File.Delete(filePath);
                }
                return deletedPayment;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
