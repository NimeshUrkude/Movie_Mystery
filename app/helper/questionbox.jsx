import { useEffect, useState } from "react";

export default function Questionbox(props) {
  const [sec, setsec] = useState(20);

  useEffect(() => {
    if (sec > 0) {
      const intervalid = setInterval(() => {
        setsec((prevsec) => prevsec - 1);
      }, 1000);
      return () => clearInterval(intervalid);
    } else {
      wrong();
    }
  }, [sec]);

  function btn(check) {
    return () => {
      props.cback(check);
      setsec(20);
    };
  }

  function wrong() {
    props.cback(null);
  }

  return (
    <div className="questionbox_div">
      <p
        className="questionbox_question"
        dangerouslySetInnerHTML={{ __html: props.ques }}
      ></p>

      <p className="questionbox_time">{sec}</p>

      <p
        className="questionbox_options"
        dangerouslySetInnerHTML={{ __html: "A)" + props.opti[0] }}
      ></p>
      <p
        className="questionbox_options"
        dangerouslySetInnerHTML={{ __html: "B)" + props.opti[1] }}
      ></p>
      <p
        className="questionbox_options"
        dangerouslySetInnerHTML={{ __html: "C)" + props.opti[2] }}
      ></p>
      <p
        className="questionbox_options"
        dangerouslySetInnerHTML={{ __html: "D)" + props.opti[3] }}
      ></p>

      <div className="questionbox_center">
        <button className="questionbox_btn" onClick={btn(props.opti[0])}>
          Option A
        </button>
        <button className="questionbox_btn" onClick={btn(props.opti[1])}>
          Option B
        </button>
        <button className="questionbox_btn" onClick={btn(props.opti[2])}>
          Option C
        </button>
        <button className="questionbox_btn" onClick={btn(props.opti[3])}>
          Option D
        </button>
      </div>
    </div>
  );
}

  