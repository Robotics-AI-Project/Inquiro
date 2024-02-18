interface Input {
  body: {
    wordWithChoices: string;
    optionPicked: string; //latest user's chat
  };
}

const optionHandler = async ({ body }: Input) => {
  let { wordWithChoices, optionPicked } = body;
  const optionWithWord: string = `${wordWithChoices} -> ${optionPicked}`;
  // post optionWithWord?
  return optionWithWord;
};

export default optionHandler;
