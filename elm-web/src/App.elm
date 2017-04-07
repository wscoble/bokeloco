module App exposing (..)

import Html exposing (..)
import Header
import Interop
import Types exposing (..)
import HomePage
import ServicesPage
import PortfolioPage
import BlogPage
import ContactPage


type alias Model =
    { location : Location
    }


model : Model
model =
    { location = getLocation Home
    }


loadContent : Model -> Html Msg
loadContent model =
    case model.location.page of
        Home ->
            HomePage.view

        Services ->
            ServicesPage.view

        Portfolio s ->
            PortfolioPage.view s

        Blog s ->
            BlogPage.view s

        Contact ->
            ContactPage.view


view : Model -> Html Msg
view model =
    div []
        [ Header.view model.location
        , loadContent model
        ]


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        Navigate loc ->
            let
                record =
                    { pathname = loc.pathname
                    , title = loc.title
                    }
            in
                ( { model | location = loc }, Interop.updateLocation record )

        UpdatedPath pathname ->
            let
                loc =
                    getLocationFromPath pathname
            in
                ( { model | location = loc }, Interop.updateTitle loc.title )


init : ( Model, Cmd msg )
init =
    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Interop.pathUpdated UpdatedPath
        ]


main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
