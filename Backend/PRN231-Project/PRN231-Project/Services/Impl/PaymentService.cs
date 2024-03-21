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
            try
            {
                var payment = _mapper.Map<Payment>(PaymentDto);
                payment.IsPaid = false;  
                return await _repository.AddPaymentAsync(payment);
            }
            catch (Exception ex)
            {
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
            _mapper.Map(PaymentDto, existingPayment);
            return await _repository.UpdatePaymentAsync(existingPayment);
        }

        public async Task<Payment> RemovePaymentAsync(int PaymentId)
        {
            try
            {
                var deletedPayment = await _repository.RemovePaymentAsync(PaymentId);
                return deletedPayment;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}