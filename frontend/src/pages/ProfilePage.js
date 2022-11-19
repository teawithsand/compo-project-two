function ProfilePage() {
    return (
        <>
            <h1 style= {{"font-size":"50px","margin-top":"20px","margin-left":"25px"}}>Mój profil</h1>
            <div style={{"display":"flex","padding":"30px","align-items":"center"}}>
            <div style={{"margin-left":"25px"}} id="profile-frame">
                <img id="profile-picture" src="images/sample_photo.jpg" />
                
            </div>
            <p style={{ "font-size":"28px","margin-left":"25px"}}>Jan Kowalski</p>

            </div>
            <div style={{"margin-left":"25px"}}>
            <h2>Numer telefonu: </h2><span>(+48) 789 456 123</span>
            <h3>Adres e-mail: </h3><span>jan.kowalski@gmail.com</span>
            <h4>Pojazdy: </h4>
            <ul>
                <li>Hyundai i30 r.2016</li>
                <li>Fiat Multipla r.2007</li>
            </ul>
            <h5>Fundacje, które wspieram: </h5>
            <ul>
                <li><p style={{"font-weight":"bold"}}>Fabryka tlenu</p><span>566 zł (472 posadzonch drzew)</span></li>
                <li><p style={{"font-weight":"bold"}}>Rak and Roll</p><span>321 zł</span></li>
            </ul>
            <h5>Zaoszczędziłem:</h5>
            <ul>
                <li>1300g CO2</li>
                <li>137 l paliwa</li>
            </ul>
            </div>
        </>
    )
}

export default ProfilePage;
