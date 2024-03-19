using AutoMapper;
using PRN231_Project.Dto.Payment;
using PRN231_Project.Models;
using PRN231_Project.Repositories;

namespace PRN231_Project.Services.Impl
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IMapper _mapper;

        public PaymentService(IPaymentRepository paymentRepository, IMapper mapper)
        {
            _paymentRepository = paymentRepository;
            _mapper = mapper;
        }

        public async Task<PaymentDto> AddPaymentAsync(PaymentCreateDto paymentDto)
        {
            try
            {
                var payment = _mapper.Map<Payment>(paymentDto);
                var createdPayment = await _paymentRepository.AddPaymentAsync(payment);
                return _mapper.Map<PaymentDto>(createdPayment);
            }
            catch (Exception ex)
            {
                throw new Exception($"Adding payment failed: {ex.Message}");
            }
        }

        public async Task<IEnumerable<PaymentDto>> GetAllPaymentsAsync()
        {
            var payments = await _paymentRepository.GetAllPaymentsAsync();
            return _mapper.Map<IEnumerable<PaymentDto>>(payments);
        }

        public async Task<PaymentDto> GetPaymentByIdAsync(int paymentId)
        {
            var payment =  await _paymentRepository.GetPaymentByIdAsync(paymentId);
            return _mapper.Map<PaymentDto>(payment);
        }

        public async Task<IEnumerable<PaymentDto>> GetPaymentsByUserIdAsync(int userId)
        {
            var payments = await _paymentRepository.GetPaymentsByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<PaymentDto>>(payments);
        }

        public async Task<bool> RemovePaymentAsync(int paymentId)
        {
            return await _paymentRepository.RemovePaymentAsync(paymentId);
        }

        public async Task<PaymentDto> UpdatePaymentAsync(int paymentId ,PaymentUpdateDto paymentDto)
        {
            var existingPayment = await _paymentRepository.GetPaymentByIdAsync(paymentId);
            if (existingPayment == null)
            {
                throw new Exception($"Payment with ID {paymentId}");
            }

            _mapper.Map(paymentDto, existingPayment);

            try
            {
               var updatedPayment = await _paymentRepository.UpdatePaymentAsync(existingPayment);
                return _mapper.Map<PaymentDto>(updatedPayment);
            }
            catch (Exception ex)
            {
                throw new Exception($"Updating payment failed: {ex.Message}");
            }
        }       
    }
}
