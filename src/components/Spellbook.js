import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Spellbook.css';



export default function Spellbook(props) {
    const [spells, setSpells] = useState([])
    const [slideTotal, setSlideTotal] = useState(0);



    const ordinalSuffix = (i) => {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }
    console.log(spells);

    return (
        <div className="spellbook-carousel">
              {spells && spells.length > 0
                    && <div className="slide-container" >
    
                      <div className="slider-content">
                          {spells.map((spell, index) => (
                                    <div key={index}>
    
                                        <div className="spell-context">
                                            <div className="spell-image">
                                                <img src={spell.image} alt={spell.name} width="512" height="512"/>
                                            </div>
                                            <div className="name">
                                                <h1>{spell.name}</h1>
                                            </div>
                                            <div className="subtitle">
                                                <span>{ordinalSuffix(spell.level)} level {spell.school} {spell.ritual ? '(ritual)' : ''}</span>
                                            </div>
                                            <div className="spell-features">
                                                <ul>
                                                    <li>
                                                        <span>Casting Time: </span> {spell.castTime}
                                                    </li>
                                                    <li>
                                                        <span>Range: </span> {spell.range}
                                                    </li>
                                                    <li>
                                                        <span>Components: </span> {spell.components} {spell.materials ? '('+spell.materials+')' : ''}
                                                    </li>
                                                    <li>
                                                        <span>Duration: </span> {spell.duration}
                                                    </li>
                                                    <li>
                                                        {spell.description}
                                                    </li>
                                                </ul>
                                            </div>   
                                            
                                        </div>
                                    </div>
                          ))}
                        </div>
    
                    </div>}
            </div>
      );
}

Spellbook.propTypes = {
    spells: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        school: PropTypes.string.isRequired,
        castTime: PropTypes.string,
        range: PropTypes.string,
        components: PropTypes.string,
        materials: PropTypes.string,
        ritual: PropTypes.bool,
        duration: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string.isRequired,
    })).isRequired
  };
