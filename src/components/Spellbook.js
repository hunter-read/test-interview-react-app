import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Spellbook.css';

export default function Spellbook() {
    const [spells, setSpells] = useState(null);
    const [currentSpell, setCurrentSpell] = useState(null);
    const [page, setPage] = useState(0);

    const url = 'https://startplaying.games/api/detect-magic/spells?'

    useEffect(() => {
        getSpells(0)
            .then((response) => response.json())
            .then((spellData) => initSpells(spellData))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const initSpells = (spellData) => {
        setCurrentSpell(spellData.spells[0]);
        setSpells(spellData.spells);
    }
    const getSpells = async (fetchPage) => {
      return await fetch(url + new URLSearchParams({
        page: fetchPage
      }))
    }

    const updateCurrentSpell = (index) => {
        setCurrentSpell(spells[index]);
        if (index + 2 === spells.length) {
            getSpells(page + 1)
                .then((response) => response.json())
                .then((spellData) => setSpells(spells.concat(spellData.spells)))
                .catch((err) => {
                    console.log(err.message);
                });
            setPage(page + 1);
        }
    }

    const ordinalSuffix = (i) => {
        var j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    }

    return (
        <div className="spellbook-carousel">
            <div>
                {spells && spells.length > 0 &&
                    <Carousel 
                        showThumbs={false} 
                        width="1024px" 
                        infiniteLoop 
                        centerMode 
                        centerSlidePercentage={50} 
                        showIndicators={false} 
                        showStatus={false}
                        onChange={updateCurrentSpell}>
                        {spells.map((spell, index) => (
                            <div key={index}>
                                <img className="spell-image" src={spell.image} alt={spell.name}/>
                                <h1 className="legend">
                                    {spell.name}
                                </h1>
                            </div>
                        ))}
                    </Carousel>
                }
            </div>
            <div>
                {spells && spells.length > 0 && currentSpell &&
                <div className="spell-context">
                    <div className="name">
                        <h1>{currentSpell.name}</h1>
                    </div>
                    <div className="subtitle">
                        <span>{currentSpell.level === 0 ? 'cantrip' : ordinalSuffix(currentSpell.level) + ' level'}  {currentSpell.school} {currentSpell.ritual ? '(ritual)' : ''}</span>
                    </div>
                    <div className="spell-features">
                        <ul>
                            <li>
                                <span>Casting Time: </span> {currentSpell.castTime}
                            </li>
                            <li>
                                <span>Range: </span> {currentSpell.range}
                            </li>
                            <li>
                                <span>Components: </span> {currentSpell.components} {currentSpell.materials ? '('+currentSpell.materials+')' : ''}
                            </li>
                            <li>
                                <span>Duration: </span> {currentSpell.duration}
                            </li>
                            <li className="description">
                                {currentSpell.description}
                            </li>
                        </ul>
                    </div>
                </div>

            }
            </div>
        </div>
      );
}
