export default function Tablerow(props) {
    return (
        <tr>
            <td>{props.pos}</td>
            <td>{props.data.score}</td>
            <td>{props.data.name}</td>
        </tr>
    );
  }