'use_strict';

const SlackMessagesHelper = {
	
	/**
	 * Creates a message with a image attachment
	 */
	image: function image(title, imageUrl){
		return {
			attachments: [
				{
					title: title,
					image_url: imageUrl,
				}
			]
		};
	},
};

module.exports = SlackMessagesHelper;
