import { Form, Field } from 'react-final-form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function onSubmit() {
  console.log("working")
}
function validate() {
  console.log("definitely working")
}

const MyForm = () => (
  <Container>
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h2 style={{"margin-top":"12px"}}>OD:</h2>
          <div>

            <Field name="OD:" component="input" placeholder="Wpisz punkt startowy" />
          </div>
          <h2 style={{"margin-top":"12px"}}>DO:</h2>
          <Field name="DO:">
            {({ input, meta }) => (
              <div>
                <input type="text" {...input} placeholder="Wpisz punkt docelowy" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <span style={{ "font-size": "20px","margin-top":"12px" }}>Dodaj przystanek</span>
          <Field name="przystanek">
            {({ input, meta }) => (
              <div>
                <input type="text" {...input} placeholder="Przystanek" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <span style={{"margin-top":"12px"}}>Data i godzina</span>
          <div>
            <input type="date" id="start" name="trip-start"
              value="2022-11-20"
              min="2022-11-19" max="2025-12-31">

            </input>


            <input type="time" id="appt" name="appt"
              min="00:00" max="24:00" required></input>
          </div>
          <span style={{"margin-top":"12px"}}>Fundacja: </span>
          <div>
           
            <select name="Wybierz fundację">
              <option value="Rak and Roll">Rak and Roll</option>
              <option value="Fabryka tlenu">Fabryka tlenu</option>
              <option value="Fundacja Dzieciom">Fundacja Dzieciom</option>
              <option value="Avalom">Avalon</option>
              <option value="WOŚP">Wielka Orkiestra Świątecznej Pomocy</option>
              <option value="Caritas">Caritas</option>
              <option value="PCK">Polski Czerwony Krzyż</option>




            </select>
          </div>
          <button style={{ "width": "30ch", "margin-left": "auto", "margin-right": "auto","margin-top":"30px" }} type="zatwierdz">Zatwierdź</button>
        </form>
      )}
    />
  </Container>
)

export default MyForm