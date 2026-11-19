export default function Hero ({ namaRuangBaca, slogan, jadwal}) {
    return (
        <div className="bg-blue-600 text-white py-16 px-4 text-center rounded-b-3xl shadow-lg mb-8">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    {namaRuangBaca}
                </h1>
                <p className="text-lg md:text-xl font-light mb-6">
                    {slogan}
                </p>
                <div className="inline-block bg-white text-amber-700 px-6 py-2 rounded-full font-medium text-sm">
                    {jadwal}
                </div>
            </div>
        </div>
    )
}
