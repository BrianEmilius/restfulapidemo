module.exports = (app) => {
	require('./redirect')(app);
	require('./cors')(app);
};