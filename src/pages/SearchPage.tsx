import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {FadeInFromDown} from '../components/Animations/FadeInFromDown.tsx';
import SearchItem from '../components/SearchItem.tsx';
import {TextField} from '../components/TextField.tsx';
import {useLanguage} from '../contexts/LagnuageContext.tsx';
import {SearchItemContract, SearchResult} from '../server/Contracts.tsx';
import {Search} from '../server/GeometryAppClient.ts';
import {Level} from "../components/Level.tsx";
import {ReactComponent as BackSvg} from '../svgs/back.svg';
import {ButtonSquare, ButtonSquareStyle} from "../components/ButtonSquare.tsx";
import Text, {TextStyle} from "../components/Text.tsx";

const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { getLang } = useLanguage();
    const [query, setQuery] = useState(searchParams.get('query') ?? '');
    const [isLucky, setIsLucky] = useState(searchParams.get("lucky") === "1");
    const [page, setPage] = useState(0);
    const [result, setResult] = useState<SearchResult>();

    console.log('render');
    useEffect(() => {
        Search(query, page, isLucky)
            .then(x => setResult(x))
            .catch(x => console.error(x))
    }, [searchParams])

    function changeQuery(query: string) {
        navigate('/search?' + new URLSearchParams({ query, page: page.toString() }));
    }

    function renderPreviewItem(item: SearchItemContract): React.ReactNode {
        console.log(item);
        if (item.type === 1)
            return <Level level={item}/>
        return <SearchItem item={item} />
    }

    return <div className="main-container">
        <div style={{ minHeight: "70vh" }}>
            <FadeInFromDown>
                <div style={{display: "grid", gridTemplateColumns: "60px auto"}}>
                    <ButtonSquare
                        style={ButtonSquareStyle.Simple}
                        icon={<BackSvg stroke='#000' width={40} height={40} style={{display: "block", margin: 'auto'}}></BackSvg>}
                        onClick={e => navigate('/')}
                    />
                    <div id="search-box" className="animated">
                        <TextField children={query} onChange={text => setQuery(text)} apply={() => changeQuery(query)}></TextField>
                    </div>
                </div>
            </FadeInFromDown>
            <div style={{ display: 'grid', gap: "12px", margin: "32px 16px 0 16px", wordBreak: 'break-all' }}>
                {result && <>
                    <FadeInFromDown animationDelay={0.15}>
                        <div style={{ fontSize: "12px" }}>
                            <Text style={TextStyle.Additional}>results: <span>{result.total}</span></Text>
                            <Text style={TextStyle.Additional}>time spend: <span>{result.timeSpend}</span> ms</Text>
                        </div>
                    </FadeInFromDown>
                    {result.items.map((x, i) => <FadeInFromDown key={`${x.id}-${i}`} children={renderPreviewItem(x)} animationDelay={i * 0.06} />)}
                </>
                }
            </div>
        </div>
    </div>
}

export default SearchPage;