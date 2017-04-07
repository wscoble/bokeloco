port module Interop exposing (..)


port updateLocation : { pathname : String, title : String } -> Cmd msg


port pathUpdated : (String -> msg) -> Sub msg


port updateTitle : String -> Cmd msg
