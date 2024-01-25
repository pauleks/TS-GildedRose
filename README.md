# Homework task: Gilded Rose

## Usage
After compiling the project, you can run it as such:
```
cd app
node . --updates <number of updates> --requests <number of requests>
```

The application requires two arguments to be provided:
- ` --updates `: The number of shop updates to do
- ` --requests `: Number of requests to be sent to the mock API

An example:
```
node . --requests 5 --updates 10
```
The application with these arguments will send 5 parallel requests to the mock API, then update the gilded rose shop and, lastly, it will repeat this process 9 more times.

## Walkthrough

The data for shop's items are stored inside of ` app/index.ts ` file.

After running the application, updates to the Gilded Rose's shop will be seen in the console, while the amount of positive requests each loop (as written in the Node.js task requirements) can be found in app/log.txt.

More about the shop's update process, special items are incompatable with becoming conjured in the current application logic process, only common items can become conjured at this time. I was thinking about adding logic for conjured special items like conjured Aged Brie, whose quality would increase twice as much, but because of uncertainty about the task's conditions for this case, I decided against doing that until such case would be requested to be added.
However, Aged Brie's quality inceases twice as much after the deadline has passed, as this logic has been kept from the code before refactoring.