We are building a Machine Learning model to predict the price of a house based on the size of the house, the number of bedrooms, the number of bathrooms, and the location of the house.
For this, we are using **Python**.

During CI we will need to take care of linting, test and building.
**Linting**: We will use **pylint** to check for errors and compliance in the code.
**Testing**: We will use **pytest** to test the code. This testing, beyond checking that the code runs, should also check and compare the new model with the already existing model.
**Building**: We will use **poetry** to build the code.

In order to decide on self-hosted or cloud-based CI, we will need to take into account how complex the model is, how much time it takes to build and how much time it takes to run the tests.
Initially, we will use cloud-based CI for ease of use. However, as the model evolves and gets more complex, we will need to consider self-hosted CI in case we start to hit the resource limits of cloud-based CI, or if we require a more fine-tuned CI proccess.

To this effect, we will start with Gitlab CI/CD, and potentially move to Bamboo as a self-hosted option, or the more modern DroneCI.