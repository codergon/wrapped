import "./deposit.scss";
import { useAccount } from "wagmi";
import { usePaystackPayment } from "react-paystack";
import { ArrowFatLineDown } from "@phosphor-icons/react";

const Deposit = () => {
  const { address } = useAccount();

  const config = {
    amount: 1000000,
    email: "atakes@kkkk.com",
    reference: new Date().getTime().toString(),
    publicKey: "pk_test_451a210edccd9b16a68940ead54b0819512ee1b4",
    metadata: {
      custom_fields: [
        {
          value: btoa(address!),
          display_name: "Address",
          variable_name: "address",
        },
      ],
    },
  };

  const onSuccess = (reference: any) => {
    console.log(reference);
  };

  const onClose = () => {
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="deposit">
      <div className="deposit__header">
        <h2>
          Deposit <span>Naira</span> to your account
        </h2>
        <p>
          Your deposits will be converted to wrapped naira and added to your
          wallet
        </p>
      </div>

      <div className="deposit__body">
        <div className="deposit__body-header">
          <div className="deposit__body-header__btns">
            <div
              className="header-btn"
              onClick={() => {
                initializePayment({
                  onSuccess,
                  onClose,
                });
              }}
            >
              <ArrowFatLineDown size={18} weight="bold" />
              <p>Deposit naira</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
