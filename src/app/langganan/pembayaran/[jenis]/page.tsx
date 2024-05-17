'use client'
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from "../../../contexts/AuthContext";
import { getSpecifiedPaket, registerTransaction } from "../../../actions/langganan";
import toast from "react-hot-toast";

interface Paket {
    jenis: string;
    harga: number;
}

const PembayaranPage = () => {
    const { isAuthenticated, email } = useAuth(); 
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const params = useParams();
    const { jenis } = params;
    const [paket, setPaket] = useState<Paket[]>([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [dropdownLabel, setDropdownLabel] = useState('Pilih Metode Pembayaran');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleSubmit = async (selectedPaket: Paket) => {
        if (!paymentMethod){
            toast.error("Select Payment Method");
            return;
        }
        console.log(dropdownLabel);
        // TODO: submit data user ke fungsi sql (ke form)
        await registerTransaction(email, selectedPaket.jenis,selectedPaket.harga, paymentMethod);
        toast.success("Purchase Success");
        router.push('/langganan');
    };

    const handlePaymentMethodChange = (method: string) => {
        setPaymentMethod(method);
        setDropdownLabel(method);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    async function getDetails(jenis : string){
        const result = await getSpecifiedPaket(jenis);
        setPaket(result.rows as Paket[]);
    }

    useEffect(() => {
        setIsLoaded(true);
        getDetails(jenis as string);
      }, []);
    
    if (isLoaded) {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }
    }

    return (
        <main className="flex min-h-screen text-white-100 flex-col items-center gap-8 p-48"> 
            <h1 className="text-4xl font-bold text-center">Pembayaran Paket</h1> 
            <div className="flex flex-col gap-8 w-full max-w-4xl justify-center items-center">
                <label>Informasi Paket yang Ingin Dibeli:</label>
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="rounded-tl-lg py-3 px-5">Jenis</th>
                                <th className="rounded-tr-lg py-3 px-5">Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paket.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{item.jenis}</td>
                                    <td className="py-2 px-4 text-center">Rp{item.harga.toLocaleString('id-ID')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <label className="mb-4">Informasi Paket yang Ingin Dibeli:
                    <div className="dropdown mb-4 flex-end">
                        <div tabIndex={0} role="button" className="btn m-1" onClick={toggleDropdown}>{dropdownLabel}</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {isDropdownOpen && (
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a onClick={() => handlePaymentMethodChange('GoPay')}>GoPay</a></li>
                                    <li><a onClick={() => handlePaymentMethodChange('Ovo')}>Ovo</a></li>
                                    <li><a onClick={() => handlePaymentMethodChange('MBanking')}>MBanking</a></li>
                                    <li><a onClick={() => handlePaymentMethodChange('Kartu Kredit')}>Kartu Kredit</a></li>
                                </ul>
                            )}
                        </ul>
                    </div>
                </label>
                <button onClick={() => handleSubmit(paket[0])}  className="px-4 py-2 bg-green-200 rounded-lg text-white-100 font-bold">
                    Submit
                </button>
            </div>
        </main>
    );
};

export default PembayaranPage;
