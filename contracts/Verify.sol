// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Verify {


    function curr() public view returns (uint){
        return block.timestamp;
    }
    
    function duration(uint dur, uint startTime) external view returns (bool){
        uint currentTime = block.timestamp;
        if (currentTime-startTime<=dur && startTime<=currentTime){
            return true;
        }
        else{
            return false;
        }
    }
}