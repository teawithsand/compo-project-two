import { Form, Field } from 'react-final-form'
function onSubmit(){
    console.log("working")
}
function validate(){
    console.log("definitely working")
}

const MyForm = () => (
  <Form  
  onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Od</h2>
        <div>
        
          <Field name="Od" component="input" placeholder="Wpisz punkt startowy" />
        </div>
        <h2>Do</h2>
        <Field name="Do">
          {({ input, meta }) => (
            <div>
              <input type="text" {...input} placeholder="Wpisz punkt docelowy" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <h2>Dodaj przystanek</h2>
        <Field name="przystanek">
          {({ input, meta }) => (
            <div>
              <input type="text" {...input} placeholder="Przystanek" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        
    <label for="start">Data podróży:</label>
    <input type="date" id="start" name="trip-start"
       value="2022-11-20"
       min="2022-11-19" max="2025-12-31">

        </input>
        <label for="appt">Wybierz preferowaną godzinę odjazdu:</label>

    <input type="time" id="appt" name="appt"
        min="00:00" max="24:00" required></input>
        <button type="zatwierdz">Zatwierdź</button>
      </form>
    )}
  />
)

export default MyForm