import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPal = () => {
    return (
        <div>
            <PayPalScriptProvider
                options={{
                    'client-id': 'AUWhI4daXRzzzPuCLHcmnB7VhWvUd_RSJ0FQXeoOgAC7TQwGClUvVkVTIh4O868Uje6Ql2_uSbWkTxNE',
                }}
            >
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            description: 'Enroll course in In Learning',

                            purchase_units: [
                                {
                                    amount: {
                                        value: 10,
                                    },
                                },
                            ],
                            application_context: {
                                shipping_preference: 'NO_SHIPPING',
                            },
                        });
                    }}
                    onApprove={(data, action) => {
                        // This function captures the funds from the transaction.
                        return action.order.capture().then((details) => {
                            // This function shows a transaction success message to your buyer.
                            // const fetchApi = async () => {
                            //     const result = await postService.postEnrollment({
                            //         userId,
                            //         courseId: course.courseId,
                            //         date: details.create_time,
                            //         transactionId: details.id,
                            //         payerId: details.payer.payer_id,
                            //         emailPayment: details.payer.email_address,
                            //         status: 'Is Learning',
                            //     });
                            //     navigate(`/Courses/Lessions/${firstLession}`, {
                            //         state: { from: location },
                            //     });
                            // };
                            //   console.log(details.payer);
                            // fetchApi();
                        });
                    }}
                    onError={(error) => {
                        console.error('An error occurred:', error);
                        alert('An error occurred, please try again later.');
                    }}
                ></PayPalButtons>
            </PayPalScriptProvider>
        </div>
    );
};

export default Paypal;
