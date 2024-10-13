import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import AdvanceInput from '../components/AdvanceInput/AdvanceInput';
import { QueryRequest, SearchItem, SearchResult } from '../services/search/models';
import { useSearch } from '../context/SearchContext';
import { buildQuery, parseQuery } from '../services/search/QueryBuilder';
import Level from '../components/Level';
import { FadeInFromDown } from '../components/Animations/FadeInFromDown';
import { TextField } from '../components/TextField';
import Text, { TextStyle } from '../components/Text/Text';
import SearchItemComponent from '../components/SearchItemComponent';
import BackSvg from '../svgs/back.svg';
import { ButtonSquare, ButtonSquareStyle } from '../components/ButtonSquare';

const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const search = useSearch();
    const [state, setState] = useState({
        query: parseQuery(searchParams.get('query') ?? ''),
        isLucky: searchParams.get("lucky") === "1",
        page: Number.parseInt(searchParams.get("page") ?? "0")
    });
    const [input, setInput] = useState<QueryRequest>(state.query);
    const [result, setResult] = useState<SearchResult | undefined>();

    useEffect(() => {
        search
            .search(state.query, state.isLucky, state.page)
            .then(x => setResult(x))
            .catch(e => console.error("failed to search", e));
    }, [searchParams])

    useEffect(() => {
        changeQuery(buildQuery(state.query));
    }, [state])

    function changeQuery(query: string) {
        navigate('/search?' + new URLSearchParams({ query, page: state.page.toString() }));
    }

    function renderPreviewItem(item: SearchItem): React.ReactNode {
        if (item.type === 1)
            return <Level level={item}/>
        return <SearchItemComponent item={item} />
    }

    return <div className="main-container">
        <div style={{ minHeight: "70vh" }}>
            <FadeInFromDown>
                <div style={{ display: "grid", gridTemplateColumns: "60px auto" }}>
                    <ButtonSquare
                        style={ButtonSquareStyle.Simple}
                        icon={<BackSvg stroke='#000' width={40} height={40} style={{ display: "block", margin: 'auto' }}></BackSvg>}
                        onClick={e => navigate('/')}
                    />
                    <AdvanceInput changed={setInput}
                        submit={x => setState({
                            isLucky: state.isLucky,
                            page: state.page,
                            query: x
                        })} prepend={input} />
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