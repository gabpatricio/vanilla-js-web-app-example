import assert from 'assert'

class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'), //elemento do titulo visto com a ferramenta de "foco"
    titleFeedback: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    urlFeedback: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit')
  }
  typeTitle(text) {
    if(!text) return; //se não tiver texto, não faz nada
    this.elements.titleInput().type(text)
  }

  typeUrl(text) {
    if(!text) return;
    this.elements.imageUrlInput().type(text)
  }
  clickSubmit() {
    this.elements.submitBtn().click()
  }
}
const registerForm = new RegisterForm()
const colors = {
  errors: 'rgb(220, 53, 69)'
}

describe('Image Registration', () => { //pega o título lá do app.feature que é os cenarios em gherkin
  describe('Submitting an image with invalid inputs', () => {
    after(() => {
      cy.clearAllLocalStorage()
    })
    const input ={ //classe input
      title: '', //titulo vazio porque é erro
      url:'' //url vazio porque é erro
    }

    it('Given I am on the image registration page', () => {
      cy.visit('/')
   })

   it('When I enter "${input.title}" in the title field', () => {
   registerForm.typeTitle(input.title)  //chama a função typeTitle da classe RegisterForm
  })

   it('When I enter "${input.url}" in the title field', () => {
    registerForm.typeUrl(input.url)  //chama a função typeUrl da classe RegisterForm
   })

   it('Then I click the submit button', () => {
    registerForm.clickSubmit() //chama a função clickSubmit da classe RegisterForm
  })

   it('Then I should see "Please type a title for the image" message above the title field', () => {
    //registerForm.elements.titleFeedback().should(element => {
    //      debugger
    // }    )}
    registerForm.elements.titleFeedback().should('contain.text', 'Please type a title for the image')
    })

   it('And I should see "Please type a valid URL" message above the imageUrl field', () => {
    registerForm.elements.urlFeedback().should('contain.text', 'Please type a valid URL')
    })

   it('And I should see an exclamation icon in the title and URL fields', () => { 
//seleciona onde tá o ícone (dentro do input) pelo inspecionar, vamos validar a cor
    registerForm.elements.titleInput().should(([element]) => {
      const styles = window.getComputedStyle(element)
      const border = styles.getPropertyValue('border-right-color')
      assert.strictEqual(border, colors.errors)
    })
  })
})
})