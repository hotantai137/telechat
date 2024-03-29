import React, { useEffect, useState } from "react";
import CONSTANTS from '../../../common/constants.json';
import stickerIcon from '../../assets/image/sticker-icon.png';
import { GiphyFetch } from "@giphy/js-fetch-api";
// import { IGif } from "@giphy/js-types";
import {
  Gif,
  Grid
} from "@giphy/react-components";
// import ResizeObserver from "react-resize-observer";

function EmojiContainer(props){
    const [modalGif, setModalGif] = useState();
    const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");
    function GridDemo({ onGifClick }) {
        const fetchGifs = (offset) =>
          giphyFetch.trending({ offset, limit: 2 });
        // const [width, setWidth] = useState(window.innerWidth);
        const [width, setWidth] = useState(372);
        return (
          <>
            <Grid
              onGifClick={onGifClick}
              fetchGifs={fetchGifs}
              width={width}
              columns={3}
              gutter={6}
            />
            {/* <ResizeObserver
              onResize={({ width }) => {
                setWidth(width);
              }}
            /> */}
          </>
        );
      }
    function selectEmoji(emojiName){
        let input = document.getElementById('input-message');
        let imgEmoji = document.createElement('img');
        imgEmoji.src = '/emoji/' + emojiName;
        imgEmoji.classList.add('emoji');
        if(input){
            input.appendChild(imgEmoji);
        }
    }

    function selectEmojiMenu(className){
        document.querySelectorAll('.emoji-container .tabs-container .tabs-tab').forEach(e => {
            e.classList.remove('active');
          });

        let menu = document.getElementsByClassName(className)[0];
        if(menu) menu.classList.add('active');
    }

    function selectSticker(path){
        props.selectSticker(path);
    }

    function selectGIF(id){
        props.selectGIF(id);
    }

    function deleteEmoji(){
        let input = document.getElementById('input-message');
        if(input && input.hasChildNodes()){
            input.removeChild(input.lastChild);
        }
    }

    return <>
        <div className="emoji-container">
                <div className="tabs-container" data-animation="tabs">
                    <div className="tabs-tab emoji-padding active">
                        <nav className="menu-horizontal-div no-stripe">
                            <button className="menu-horizontal-div-item btn-icon tgico-recent rp active"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-smile rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-animals rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-eats rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-car rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-sport rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-lamp rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-flag rp"><i className="far fa-smile"></i></button>
                        </nav>
                        <div className="emoticons-content" id="content-emoji">
                            <div className="scrollable scrollable-y">
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Frequently Used</span>
                                    </div>
                                    <div className="super-emojis">
                                        <span className="super-emoji">
                                        <img src="/emoji/1f692.png" alt="🙄" className="emoji" loading="lazy"/>
                                            {/* <img src={emojis['1f692.png']} alt="🙄" className="emoji" loading="lazy"/>
                                            <img src={require('../../assets/image/emoji/1f692.png')} alt="🙄" className="emoji" loading="lazy"/> */}
                                            <span className="emoji-placeholder"></span>
                                        </span>
                                        <span className="super-emoji">
                                            <img src="/emoji/1f692.png" alt="😉" className="emoji" loading="lazy"/>
                                            <span className="emoji-placeholder"></span>
                                        </span>
                                        <span className="super-emoji">
                                            <img src="/emoji/1f692.png" alt="😏" className="emoji"/>
                                        </span>
                                        <span className="super-emoji">
                                            <img src="/emoji/1f970.png" alt="🇯🇵" className="emoji" loading="lazy"/>
                                            <span className="emoji-placeholder"></span>
                                        </span>
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Smileys & People</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.SMILEYS_AND_PEOPLE_EMOJIS && CONSTANTS.EMOJIS.SMILEYS_AND_PEOPLE_EMOJIS.map(emojiName => {
                                                return (<span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>)
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>                                
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Animals & Nature</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.ANIMALS_AND_NATUR_MOJIS && CONSTANTS.EMOJIS.ANIMALS_AND_NATUR_MOJIS.map(emojiName => {
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Food & Drink</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.FOOD_AND_DRINK_EMOJIS && CONSTANTS.EMOJIS.FOOD_AND_DRINK_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Travel & Places</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.TRAVEL_AND_PLACES_EMOJIS && CONSTANTS.EMOJIS.TRAVEL_AND_PLACES_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Activity & Sport</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.ACTIVITY_AND_SPORT_EMOJIS && CONSTANTS.EMOJIS.ACTIVITY_AND_SPORT_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Objects</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.OBJECTS_EMOJIS && CONSTANTS.EMOJIS.OBJECTS_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Flags</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.FLAGS_EMOJIS && CONSTANTS.EMOJIS.FLAGS_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tabs-tab stickers-padding">
                        <div className="menu-wrapper emoticons-menu-wrapper">
                            <div className="scrollable scrollable-x">
                                <nav className="menu-horizontal-div no-stripe justify-start emoticons-menu">
                                    <button className="menu-horizontal-div-item btn-icon tgico-recent"></button>
                                    <button className="btn-icon menu-horizontal-div-item media-sticker-wrapper active" data-doc-id="5987542576536750131">
                                        <img src="/stickers/duckduck2_png/29.png" className="media-sticker"/>
                                    </button>
                                    <button className="btn-icon menu-horizontal-div-item media-sticker-wrapper" data-doc-id="1592756632805186039">
                                        <img className="media-sticker" src="/stickers/mochimochicats_png/67.png" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                        <div className="emoticons-content" id="content-stickers">
                            <div className="scrollable scrollable-y">
                                <div className="emoji-category">
                                    <div className="category-title">Mochi Cats @Angelsofdevils</div>
                                    <div className="category-items super-stickers">
                                        {
                                            [...Array(119).keys()].map(emojiName => {
                                                return (
                                                    <div className="grid-item super-sticker media-sticker-wrapper" key={emojiName}
                                                        onClick={()=>selectSticker("/stickers/mochimochicats_png/" + emojiName + ".png")}>
                                                        <img src={"/stickers/mochimochicats_png/" + emojiName + ".png" } className="media-sticker"/>
                                                    </div>
                                                    )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">Duck Duck by @susuimut</div>
                                    <div className="category-items super-stickers">
                                        {
                                            [...Array(68).keys()].map(emojiName => {
                                                return (
                                                    <div className="grid-item super-sticker media-sticker-wrapper" key={emojiName}
                                                        onClick={()=>selectSticker("/stickers/duckduck2_png/" + emojiName + ".png")}>
                                                        <img src={"/stickers/duckduck2_png/" + emojiName + ".png" } className="media-sticker"/>
                                                    </div>
                                                    )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tabs-tab gifs-padding">
                    {/* <GridDemo
                                    onGifClick={(gif, e) => {
                                    console.log("gif", gif);
                                    e.preventDefault();
                                    setModalGif(gif);
                                    }}
                                /> */}
                        <div className="emoticons-content" id="content-gifs">
                            <div className="scrollable scrollable-y">
                                <div className="gifs-masonry">
                                <GridDemo
                                    onGifClick={(gif, e) => {
                                    console.log("gif", gif);
                                    e.preventDefault();
                                    // setModalGif(gif);
                                    selectGIF(gif.id);
                                    }}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div className="emoji-tabs menu-horizontal-div emoticons-menu no-stripe">
            <button className="menu-horizontal-div-item emoji-tabs-search justify-self-start btn-icon tgico-search hide" data-tab="-1"></button>
            <button className="menu-horizontal-div-item emoji-tabs-emoji btn-icon tgico-smile active" data-tab="0" onClick={()=>selectEmojiMenu('emoji-padding')}></button>
            <button className="menu-horizontal-div-item emoji-tabs-stickers btn-icon tgico-stickers_face" data-tab="1" onClick={()=>selectEmojiMenu('stickers-padding')}></button>
            <button className="menu-horizontal-div-item emoji-tabs-gifs btn-icon tgico-gifs" data-tab="2" onClick={()=>selectEmojiMenu('gifs-padding')}></button>
            <button className="menu-horizontal-div-item emoji-tabs-delete justify-self-end btn-icon tgico-deleteleft" data-tab="-1" onClick={()=>deleteEmoji('gifs-padding')}></button>
        </div>
            {/* <div className="emoji-tabs menu-horizontal-div no-stripe">
                <button className="menu-horizontal-div-item emoji-tabs-search justify-self-start btn-icon tgico-search rp hide" data-tab="-1">
                    <div className="c-ripple"><i className="far fa-smile"></i></div>
                </button>
                <button className="menu-horizontal-div-item emoji-tabs-emoji btn-icon tgico-smile rp active" data-tab="0">
                    <div className="c-ripple" onClick={()=>selectEmojiMenu('emoji-padding')}><i className="far fa-smile"></i></div>
                </button>
                <button className="menu-horizontal-div-item emoji-tabs-stickers btn-icon tgico-stickers rp" data-tab="1">
                    <div className="c-ripple" onClick={()=>selectEmojiMenu('stickers-padding')}><img src={stickerIcon}/></div>
                </button>
                <button className="menu-horizontal-div-item emoji-tabs-gifs btn-icon tgico-gifs rp" data-tab="2">
                    <div className="c-ripple" onClick={()=>selectEmojiMenu('gifs-padding')}><i className="fa-light fa-gif"></i></div>
                </button>
                <button className="menu-horizontal-div-item emoji-tabs-delete justify-self-end btn-icon tgico-deleteleft rp" data-tab="-1">
                    <div className="c-ripple"><i className="far fa-smile"></i></div>
                </button>
            </div> */}
    </>
}

export default EmojiContainer;

// import { GiphyFetch } from "@giphy/js-fetch-api";
// import { IGif } from "@giphy/js-types";
// import {
//   Gif,
//   Grid
// } from "@giphy/react-components";
// import React, { useState } from "react";
// import { useAsync } from "react-async-hook";
// import { render } from "react-dom";
// import ResizeObserver from "react-resize-observer";

// const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

// // function GifDemo() {
// //   const [gif, setGif] = useState<IGif | null>(null);
// //   useAsync(async () => {
// //     const { data } = await giphyFetch.gif("fpXxIjftmkk9y");
// //     setGif(data);
// //   }, []);
// //   return gif && <Gif gif={gif} width={200} />;
// // }

// function GridDemo({ onGifClick }) {
//   const fetchGifs = (offset) =>
//     giphyFetch.trending({ offset, limit: 10 });
//   const [width, setWidth] = useState(window.innerWidth);
//   return (
//     <>
//       <Grid
//         onGifClick={onGifClick}
//         fetchGifs={fetchGifs}
//         width={width}
//         columns={3}
//         gutter={6}
//       />
//       <ResizeObserver
//         onResize={({ width }) => {
//           setWidth(width);
//         }}
//       />
//     </>
//   );
// }

// function App() {
//   const [modalGif, setModalGif] = useState();
//   return (
//     <>
//       <h4>Grid</h4>
//       <GridDemo
//         onGifClick={(gif, e) => {
//           console.log("gif", gif);
//           e.preventDefault();
//           setModalGif(gif);
//         }}
//       />
//       {modalGif && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             background: "rgba(0, 0, 0, .8)"
//           }}
//           onClick={(e) => {
//             e.preventDefault();
//             setModalGif(undefined);
//           }}
//         >
//           <Gif gif={modalGif} width={200} />
//         </div>
//       )}
//     </>
//   );
// }

// const rootElement = document.getElementById("root");
// render(<App />, rootElement);
