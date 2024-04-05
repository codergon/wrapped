import axios from "axios";
import "./withdrawal.scss";
import { useState } from "react";
import { Dna } from "lucide-react";
import { useAccount, useWriteContract } from "wagmi";
import { ArrowFatLineUp } from "@phosphor-icons/react";
import { useApp } from "contexts";
import { P2PExchangeAbi, WNGNAbi } from "components/app/contracts/abis";
import {
  P2P_CONTRACT_ADDRESS,
  USDC_CONTRACT_ADDRESS,
  WNGN_CONTRACT_ADDRESS,
} from "components/app/contracts/data";
import { ClipLoader } from "react-spinners";

const Withdrawal = () => {
  const { signature } = useApp();
  const { address } = useAccount();
  const [amount, setAmount] = useState("1");
  const [loading, setLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const withdraw = async () => {
    if (!amount) return;

    setLoading(true);

    try {
      const tx_hash = await writeContractAsync({
        abi: WNGNAbi,
        functionName: "burn",
        address: WNGN_CONTRACT_ADDRESS,
        args: [Number(amount) * Math.pow(10, 6)],
      });

      console.log(tx_hash);

      await axios.post(
        "/withdraw",
        {
          tx_hash,
          address,
        },
        {
          headers: {
            "X-Signature": `${address}:${signature}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdrawal">
      <div className="withdrawal__header">
        <h2>
          Withdraw your <span>WNGN</span> to naira
        </h2>
        <p>Move your WNGN to your bank account</p>
      </div>

      <div className="withdrawal__body">
        <div className="withdrawal-input">
          <div className="wngn-icon">
            <Dna size={20} />
          </div>

          <div className="withdrawal-input__block">
            <input
              min={0}
              type="number"
              value={amount}
              placeholder="Amount to withdraw"
              onChange={(e) => setAmount(e.target.value)}
            />
            <p>Balance: 2300 WNGN</p>
          </div>

          <button className="max-btn">Max</button>
        </div>

        <div
          className={`withdrawal-btn ${loading ? "disabled" : ""}`}
          onClick={() => {
            withdraw();
          }}
        >
          <ArrowFatLineUp size={18} />
          <p>Withdraw</p>

          {loading && (
            <div className="c-spinner">
              <ClipLoader
                size={16}
                color={"#000"}
                loading={loading}
                aria-label="Loading Spinner"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
