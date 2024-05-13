const DetailChartPage = () => {
    return (
        <div className="flex flex-col text-white-100 px-8  xl:px-20 py-16 min-h-screen ">
            <div className="w-full lg:px-20 py-24 ">
                <h1 className="text-5xl font-bold text-center">Top Chart in Marmut</h1>
                <div className="w-full mt-24">
                    <div className="flex flex-col xl:flex-row gap-16 justify-between w-full items-center">
                        <div className="card w-96 glass" style={{ width: '300px', minHeight: '400px' }}>
                            <figure><img src="/images.png" alt="car!" /></figure>
                            <div className="card-body" style={{ flex: '1', overflow: 'auto' }}>
                                <h2 className="card-title">Daily Top 20</h2>
                                <p>Experience today's most popular picks!</p>
                                <div className="card-actions justify-end">
                                    <button className="btn ">Learn now!</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 glass" style={{ width: '300px', minHeight: '400px' }}>
                            <figure><img src="/images2.jpg" alt="car!" /></figure>
                            <div className="card-body" style={{ flex: '1', overflow: 'auto' }}>
                                <h2 className="card-title">Weekly Top 20</h2>
                                <p>Discover what's trending this week!</p>
                                <div className="card-actions justify-end">
                                    <button className="btn ">Lihat Daftar Lagu</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 glass" style={{ width: '300px', minHeight: '400px' }}>
                            <figure><img src="/images3.jpg" alt="car!" /></figure>
                            <div className="card-body" style={{ flex: '1', overflow: 'auto' }}>
                                <h2 className="card-title">Monthly Top 20</h2>
                                <p>Unveil the hottest picks of the month!</p>
                                <div className="card-actions justify-end">
                                    <button className="btn ">Lihat Daftar Lagu</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 glass" style={{ width: '300px', minHeight: '400px' }}>
                            <figure><img src="/images4.jpg" alt="car!" /></figure>
                            <div className="card-body" style={{ flex: '1', overflow: 'auto' }}>
                                <h2 className="card-title">Yearly Top 20</h2>
                                <p>Get a glimpse of the year's top tunes!</p>
                                <div className="card-actions justify-end">
                                    <button className="btn ">Lihat Daftar Lagu</button>
                                </div>
                            </div>
                        </div>
                       

                    </div>
                </div>

            </div>
        </div>
    );
}


export default DetailChartPage;