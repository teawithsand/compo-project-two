export default function Ranking({items}) {
    const list = items.map((i) => <li>{i}</li>)
    return <>
        <ol>
            {list}
        </ol>
    </>
}