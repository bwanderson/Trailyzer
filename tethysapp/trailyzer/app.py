from tethys_sdk.base import TethysAppBase, url_map_maker


class TrailAnalyzer(TethysAppBase):
    """
    Tethys app class for Trail Analyzer.
    """

    name = 'Trail Analyzer'
    index = 'trailyzer:home'
    icon = 'trailyzer/images/icon.gif'
    package = 'trailyzer'
    root_url = 'trailyzer'
    color = '#1abc9c'
    description = 'Place a brief description of your app here.'
    enable_feedback = False
    feedback_emails = []

        
    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (UrlMap(name='home',
                           url='trailyzer',
                           controller='trailyzer.controllers.home'),
        )

        return url_maps