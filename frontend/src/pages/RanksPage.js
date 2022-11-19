import Ranking from '../components/Ranking'
import Button from 'react-bootstrap/Button'
import { useState } from "react";

function RanksPage() {

    const [ranking, setRanking] = useState("overall");

    return (
        <>
            <h1>Rankingi</h1>
            <div style={{ "display": "flex" }}>
                {ranking === "overall" ?
                    <>
                        <Button variant="primary" onClick={() => setRanking("overall")}>Sumaryczny</Button>
                        <Button variant="secondary" onClick={() => setRanking("monthly")}>Miesięczny</Button>
                    </>
                    :
                    <>
                        <Button variant="secondary" onClick={() => setRanking("overall")}>Sumaryczny</Button>
                        <Button variant="primary" onClick={() => setRanking("monthly")}>Miesięczny</Button>
                    </>
                }
            </div>
            {ranking === "overall" ?
                <>
                    <h2>Ranking sumaryczny</h2>
                    <Ranking items={[
                        "Piotr Nowak (2013 zł)",
                        "Jan Kowalski (887 zł)",
                        "Mariusz Kocimski (634 zł)",
                        "Adrian Glaziński (607 zł)",
                        "Maciej Janczak (230 zł)"
                    ]} />
                </>
                :
                <>
                    <h2>Ranking miesięczny</h2>
                    <Ranking items={[
                        "Piotr Nowak (983 zł)",
                        "Mariusz Kocimski (525 zł)",
                        "Jan Kowalski (513 zł)",
                        "Maciej Janczak (176 zł)"
                    ]} />
                </>
            }
        </>
    )
}

export default RanksPage;
