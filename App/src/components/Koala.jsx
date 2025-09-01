import React from 'react';
import styled from 'styled-components';

const Koala = () => {
  return (
    <StyledWrapper>
      <div aria-label="Cartoon of a smiling koala" role="img" className="article">
        <div className="body">
          <div className="shadow" />
          <div className="chest">
            <div className="leg" />
            <div className="leg" />
            <div className="arm" />
            <div className="arm" />
          </div>
        </div>
        <div className="head">
          <div className="ear" />
          <div className="ear" />
          <div className="face">
            <div className="eye" />
            <div className="eye" />
            <div className="nose" />

            <div className="mouth" />
            <div className="hair" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .article {
    --fur: #aac;
    --detail: #222;
    --mouth: radial-gradient(49% 55% at 50% 89%, #0000, #c001 40%, #0000 0),
      radial-gradient(50% 50% at 50% 88%, #fff 38%, #0000, #00000003 40%, #0000 0),
      linear-gradient(130deg, #bbc0cc88, #bbccc000),
      linear-gradient(-130deg, #0081, #0080),
      linear-gradient(#0084 10%, #0000 50%);
    --dots: radial-gradient(circle, #0001 0.1em, #0000 0) 1em 1em / 3em 7em,
      radial-gradient(circle, #0001 0.1em, #0000 0) 1em 1em / 7em 3em,
      radial-gradient(circle, #0001 0.1em, #0000 0) 1em 1em / 11em 13em,
      radial-gradient(circle, #fff2 0.1em, #0000 0) 1em 1em / 13em 11em,
      radial-gradient(circle, #fff3 0.1em, #0000 0) 1em 1em / 5em 5em,
      radial-gradient(circle, #fff4 0.1em, #0000 0) 1em 1em / 4em 9em;
    --light: radial-gradient(at 35% 30%, #fff5, #fff0 40%),
      radial-gradient(at 45% 40%, #fff6, #fff0 70%);
    position: relative;
    font-size: 1vmin;
    width: 80em;
    aspect-ratio: 1;
    transform: scale(0.5);
    animation: floating 5s ease-in-out infinite;

    .body {
      width: 63%;
      height: 45%;
      left: 50%;
      translate: -50%;
      top: 50%;

      .shadow {
        width: 120%;
        height: 33%;
        background: radial-gradient(#0009, #0000 50%),
          radial-gradient(60% 100% at 26% 40%, #0009, #0000 30%),
          radial-gradient(60% 100% at 75% 45%, #0009, #0000 30%),
          radial-gradient(#8001 30%, #8000 50%),
          radial-gradient(#0082 40%, #0084 60%), #0003;
        opacity: 0.6;
        border-radius: 50%;
        bottom: 2%;
        left: 53%;
        transform: translate(-50%, 14%);
        filter: blur(1.2em);
      }

      .chest {
        --mouth: radial-gradient(49% 55% at 50% 70%, #0000, #c001 80%, #0000 0),
          radial-gradient(
            50% 55% at 50% 69%,
            #fff 78%,
            #0000,
            #00000003 80%,
            #0000 0
          ),
          linear-gradient(130deg, #bbc0cc88, #bbccc000),
          linear-gradient(-130deg, #0081, #0080),
          linear-gradient(#0084 10%, #0000 50%);
        left: 50%;
        translate: -50%;
        border-radius: 100% / 155% 155% 56% 56%;
        width: 60%;
        height: 90%;
        box-shadow:
          inset 0 40em 4em -25em #8003,
          inset 0 40em 6em -26em #0083,
          inset 0 43em 5em -28em #0004,
          inset 0 48em 2em -35em #0006,
          inset 0 0 4em -2.75em,
          inset -4em 0 4em -2em #0083,
          inset 0 -6em 8em -4em #8004,
          inset 0 -4em 4em -2em #0083,
          inset 1em 1em 3em #fff5;
        background: radial-gradient(60% 100% at 50% 80%, #0000 40%, #3002),
          radial-gradient(10% 5% at 50% 0, #0001, #0000 80%), var(--dots),
          var(--light), var(--mouth), var(--fur);

        .arm {
          width: 30%;
          height: 70%;
          border-radius: 100% / 100% 20% 40% 100%;
          bottom: 7%;
          left: 0;
          rotate: -10deg;
          background: linear-gradient(200deg, #400c, #0000 30%),
            radial-gradient(200% 80% at 65% 5%, #6003 5%, #0080 25%),
            radial-gradient(200% 70% at 80% 10%, #0082, #0080 40%),
            radial-gradient(60% 100% at 50% 80%, #0000 40%, #3002),
            radial-gradient(10% 5% at 50% 0, #0001, #0000 80%), var(--dots),
            var(--fur);
          box-shadow:
            inset 0 0 5em -2.75em,
            inset -4em 0 4em -2em #0083,
            inset 0 -6em 8em -4em #8004,
            inset 0 -4em 4em -2em #0083,
            inset 1em 1em 3em #fff5,
            0 0.75em 0.5em #0002;
          filter: drop-shadow(1em 1.5em 1em #8004)
            drop-shadow(1.25em 2em 1.5em #0074);

          &:nth-child(4) {
            scale: -1 1;
            rotate: 12deg;
            left: auto;
            right: 3%;
            box-shadow:
              inset 0 0 5em -2.75em,
              inset 4em 0 4em -2em #0083,
              inset 0 -6em 8em -4em #8004,
              inset 0 -4em 4em -2em #0083,
              inset 1em 1em 3em #fff5,
              0 0.75em 0.5em #0002;
          }
        }

        .leg {
          width: 53%;
          height: 40%;
          background: #f005;
          bottom: 0;
          transform: translate(-50%, -10%) rotate(-20deg);
          transform-origin: 80% 50%;
          left: -8%;
          border-radius: 10em 90% 40% 10em;
          box-shadow:
            inset 0 0 4em -2.75em,
            inset -4em 0 4em -2em #0083,
            inset 0 -6em 8em -4em #8004,
            inset 0 -4em 4em -2em #0083,
            inset 1em 1em 3em #fff5;
          --light: radial-gradient(at 35% 30%, #fff2, #fff0 40%),
            radial-gradient(at 45% 40%, #fff3, #fff0 70%);
          background:
            radial-gradient(60% 100% at 50% 80%, #0000 40%, #3002),
            radial-gradient(10% 5% at 50% 0, #0001, #0000 80%),
            var(--dots),
            var(--light),
            /*           radial-gradient(30% 40% at 30% 50%, pink 80%, #0000 0), */
              var(--fur);



          &::after {
            content: "";
            inset: 0;
            border-radius: 10em 90% 40% 10em;
            box-shadow:
              inset 0 0 4em -2.75em,
              inset -4em 0 4em -2em #0083,
              inset 0 -6em 8em -4em #8004,
              inset 0 -4em 4em -2em #0083,
              inset 1em 1em 3em #fff5;
          }

          &:nth-child(2) {
            left: auto;
            right: 0;
            transform: scaleX(-1) translate(-5%, -10%) rotate(-20deg);
            background: radial-gradient(60% 100% at 50% 80%, #0000 40%, #3002),
              radial-gradient(10% 5% at 50% 0, #0001, #0000 80%), var(--dots),
              var(--light), radial-gradient(60% 50% at 30% 50%, #0082 60%, #0000),
              var(--fur);

            box-shadow:
              inset 0 0 4em -2.75em,
              inset -4em 0 4em -2em #0083,
              inset 0 -6em 8em -4em #8004,
              inset 0 -4em 4em -2em #0083,
              inset 1em 1em 3em #fff5,
              inset 3em 0 4em #0084;

          }
        }
      }
    }

    .head {
      width: 63%;
      height: 59%;
      left: 50%;
      top: 5%;
      translate: -50%;

      .ear {
        --pos: -5%;
        top: 20%;
        left: var(--pos);
        width: 55%;
        aspect-ratio: 1;
        background: pink;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow:
          inset 0 0 4em -2.75em,
          inset -4em 0 4em -2em #0082,
          inset 0 -6em 8em -4em #8001,
          inset 0 -4em 4em -2em #0082,
          inset 1em 1em 3em #fff5;
        background: 
  /*         radial-gradient(60% 100% at 50% 80%, #0000 40%, #3002), */ radial-gradient(
            10% 5% at 50% 0,
            #0001,
            #0000 80%
          ),
          var(--dots), var(--light), var(--fur);

        &::after {
          content: "";
          inset: 0;
          border-radius: inherit;
          box-shadow: inherit;
          background: radial-gradient(60% 65% at 105% 90%, #8005 0%, #0000 90%),
            radial-gradient(60% 65% at 110% 95%, #0085 0%, #0000 95%),
            radial-gradient(65% 70% at 110% 95%, #0005 0%, #0000);
        }

        &::before {
          content: "";
          --pos: 55%;
          --s1: 0.75em 0.6em 1.5em -1.25em #3007, 1em 0.5em 1.5em -1em #3007;
          --s2: inset -1.5em -0.5em 0.35em -0.75em #4002,
            inset -1.5em 0.5em 0.25em -0.75em #4002;
          --c1: #e99;
          width: 75%;
          aspect-ratio: 1;
          border-radius: 50% 45% 55% 50%;
          top: 54%;
          left: var(--pos);
          transform: translate(-50%, -50%) rotate(25deg);
          background: radial-gradient(at 35% 40%, #fff8 10%, #fff0), var(--c1);
          box-shadow:
            inset 0 0 0.25em #4008,
            inset 0.25em 0.1em 0.5em 0.1em #fff8,
            inset 0.5em 0.25em 0.75em #c002,
            var(--s2),
            inset 0 0 1em 0.5em #f553,
            var(--s1);
        }

        &:nth-child(2) {
          left: calc(100% - var(--pos));

          &::after {
            scale: -1 1;
            box-shadow:
              inset 0 0 4em -2.75em,
              inset 4em 0 4em -2em #0082,
              inset 0 -6em 8em -4em #8001,
              inset 0 -4em 4em -2em #0082,
              inset 1em 1em 3em #fff5;
          }

          &::before {
            left: calc(100% - var(--pos));
            transform: translate(-50%, -50%) rotate(-25deg);
            --c1: #d88;
            --s1: 0.75em 1em 1.5em -1.25em #3007, 1em 0.5em 1.5em -1em #3007;
            --s2: inset -1.5em -0.5em 0.35em -0.75em #4002,
              inset -0.5em -1em 0.5em -0.5em #4002;
            background: radial-gradient(at 35% 40%, #fff6, #fff0), var(--c1);
            border-radius: 50%;
          }
        }


      }

      .face {
        inset: 0;
        border-radius: 100% / 128% 130% 70% 70%;
        box-shadow:
          inset 0 0 4em -2.75em,
          inset -4em 0 4em -2em #0083,
          inset 0 -6em 8em -4em #8004,
          inset 0 -4em 4em -2em #0083,
          inset 1em 1em 3em #fff5;
        background: radial-gradient(60% 100% at 50% 80%, #0000 40%, #3002),
          radial-gradient(10% 5% at 50% 0, #0001, #0000 80%), var(--dots),
          var(--light), var(--mouth), var(--fur);

        .hair {
          width: 15%;
          height: 6%;
          background: var(--fur);
          border-radius: 50%;
          left: 50%;
          top: -4%;
          transform: translate(-80%, 0) rotate(10deg);
          box-shadow:
            inset 0 0 1em 0em #0001,
            inset 0.4em 0 0.2em 0.2em #0081,
            inset 0 0.6em 0.4em 0.4em #8001,
            inset 0 0.4em 0.2em 0.2em #0081,
            inset 0.1em 0.1em 1em #fff5;
          --light: radial-gradient(at 35% 30%, #fff2, #fff0 30%),
            radial-gradient(at 45% 40%, #fff4, #fff0 70%);
          background: var(--light), var(--fur);

          &::before {
            content: "";
            inset: 0;
            background: inherit;
            border-radius: 50%;
            transform-origin: 90% 50%;
            transform: rotate(45deg);
            box-shadow: inherit;
            mix-blend-mode: lighten;
          }
        }

        .nose {
          width: 22%;
          height: 35%;
          top: 62%;
          left: 50%;
          translate: -50% -50%;
          border-radius: 100% / 120% 120% 66% 66%;
          box-shadow:
            inset 0 0 4em -1.5em,
            inset 2em 2em 1.5em -1.5em #fff5,
            inset -5em 0 4em -4em #0088,
            0 0 1em #0004,
            1em 1em 2em -1em #3007,
            1.5em 0.75em 2em -0.75em #3007;
          background: radial-gradient(at 35% 30%, #fff5, #fff0 36%),
            radial-gradient(at 40% 40%, #fff4, #fff0 60%), var(--detail);
        }

        .eye {
          --pos: 26%;
          --c1: #fff7;
          --p1: 35%;
          --b1: 1.25em -1.5em 0.75em #0000660c, 0.25em -1em 2em 2em #0061;
          --b2: 0.125em 0em 0.5em 0.5em #0001, 0 0 0.3em 0.85em #fff2;
          width: 16%;
          aspect-ratio: 1;
          border-radius: 50%;
          translate: -50% -50%;
          top: 57%;
          left: var(--pos);
          box-shadow:
            inset 0 0 4em -1.5em,
            inset 0 -2em 1em -0.5em #c003,
            inset -2em 0 1em -1em #00c3,
            inset 2em 2em 1.5em -1.5em #fff5,
            inset -5em 0 4em -4em #c003,
            inset -5em 0 4em -4em #0088,
            0 0 1em #0004,
            var(--b2),
            0.5em 1em 2em -1em #3007,
            0.75em 0.5em 2em -0.75em #3007,
            var(--b1);
          background: radial-gradient(
              var(--p1) 35% at 35% 30%,
              var(--c1) 10%,
              #fff0
            ),
            radial-gradient(at 40% 40%, #fff4, #fff0 60%), var(--detail);

          &:nth-child(2) {
            --c1: #fff5;
            --p1: 50%;
            --b1: -1.25em -1.5em 0.75em #0000660c, 0.25em -1em 2em 2em #00006608;
            left: calc(100% - var(--pos));
          }
        }

        .mouth {
          width: 14%;
          aspect-ratio: 2.5;
          border-radius: 50% / 0 0 100% 100%;
          border: 0.5em solid #900;
          border-top: 0;
          top: 83%;
          left: 50%;
          translate: -50% -50%;
          clip-path: polygon(
            0 40%,
            10% 30%,
            90% 30%,
            100% 40%,
            150% 40%,
            150% 150%,
            0 150%
          );
          /*         mask: radial-gradient(farthest-side at 50% 100%, #000 99%, #0000); */
          filter: drop-shadow(0.1em 0.1em 0.2em #800c)
            drop-shadow(-0.1em -0.1em 0.1em #fff);
        }


      }
    }
  }

  .article .body,
  .article .shadow,
  .article .chest,
  .article .chest .arm,
  .article .chest .leg,
  .article .head,
  .article .head .ear,
  .article .head .face,
  .article .head .face .eye,
  .article .head .face .nose,
  .article .head .face .cheek,
  .article .head .face .mouth,
  .article .head .face .hair,
  .article .head .face .hair::before,
  .article .head .ear::before,
  .article .head .ear::after,
  .article .chest .leg::before,
  .article .chest .leg::after,
  .article .head .face .cheek::before,
  .article .head .face .cheek::after,
  .article .head .face .eye::before,
  .article .head .face .eye::after {
    position: absolute;
    box-sizing: border-box;
  }

  @keyframes floating {
    0% {
      transform: translateY(50px) scale(0.5);
    }
    50% {
      transform: translateY(0px) scale(0.5);
    }
    100% {
      transform: translateY(50px) scale(0.5);
    }
  }`;

export default Koala;
